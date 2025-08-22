import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Shield, Search, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

interface Vulnerability {
  type: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  file: string;
  line?: number;
  code?: string;
  recommendation: string;
}

interface AnalysisResult {
  vulnerabilities: Vulnerability[];
  totalFiles: number;
  scannedFiles: number;
  riskScore: number;
}

const SecurityAnalyzer = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Common vulnerability patterns for financial/crypto applications
  const vulnerabilityPatterns = [
    {
      pattern: /pragma\s+solidity\s+[^\^]/i,
      type: 'medium' as const,
      title: 'Floating Pragma Version',
      description: 'Using a floating pragma version can lead to compilation with different compiler versions',
      recommendation: 'Use a fixed pragma version (e.g., pragma solidity 0.8.19;)'
    },
    {
      pattern: /\.call\s*\(/i,
      type: 'high' as const,
      title: 'Low-level Call Usage',
      description: 'Low-level calls can be dangerous and may lead to reentrancy attacks',
      recommendation: 'Use high-level functions or implement proper reentrancy guards'
    },
    {
      pattern: /tx\.origin/i,
      type: 'high' as const,
      title: 'tx.origin Usage',
      description: 'Using tx.origin for authorization can be exploited through phishing attacks',
      recommendation: 'Use msg.sender instead of tx.origin for authorization'
    },
    {
      pattern: /selfdestruct/i,
      type: 'high' as const,
      title: 'Selfdestruct Usage',
      description: 'Selfdestruct can permanently destroy contracts and trapped funds',
      recommendation: 'Consider using upgradeable patterns instead of selfdestruct'
    },
    {
      pattern: /delegatecall/i,
      type: 'high' as const,
      title: 'Delegatecall Usage',
      description: 'Delegatecall preserves msg.sender and msg.value, which can be exploited',
      recommendation: 'Use regular call() or implement proper access controls'
    },
    {
      pattern: /block\.timestamp/i,
      type: 'medium' as const,
      title: 'Block Timestamp Dependency',
      description: 'Relying on block.timestamp can be manipulated by miners',
      recommendation: 'Use block.number or external oracles for time-dependent logic'
    },
    {
      pattern: /require\s*\(\s*[^,]+\s*\)(?!\s*,)/i,
      type: 'low' as const,
      title: 'Missing Error Message',
      description: 'Require statements without error messages make debugging difficult',
      recommendation: 'Add descriptive error messages to all require statements'
    },
    {
      pattern: /transfer\s*\(/i,
      type: 'medium' as const,
      title: 'Transfer Usage',
      description: 'transfer() has a fixed gas limit and may fail with smart contract wallets',
      recommendation: 'Use call{value: amount}("") instead of transfer()'
    },
    {
      pattern: /private\s+.*\s+key|private.*key|secret.*key/i,
      type: 'high' as const,
      title: 'Potential Private Key Exposure',
      description: 'Private keys or secrets should never be hardcoded',
      recommendation: 'Use environment variables or secure key management systems'
    },
    {
      pattern: /0x[a-fA-F0-9]{40}/g,
      type: 'medium' as const,
      title: 'Hardcoded Address',
      description: 'Hardcoded addresses can cause issues during deployment or upgrades',
      recommendation: 'Use configurable addresses or factory patterns'
    }
  ];

  const analyzeRepository = async () => {
    if (!repoUrl.trim()) {
      setError('يرجى إدخال رابط مستودع GitHub صحيح');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // Extract owner and repo from GitHub URL
      const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        throw new Error('رابط GitHub غير صحيح');
      }

      const [, owner, repo] = match;
      const cleanRepo = repo.replace(/\.git$/, '');

      // Fetch repository structure
      const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}/git/trees/main?recursive=1`);
      
      if (!response.ok) {
        throw new Error('فشل في الوصول إلى المستودع. تأكد من أن المستودع عام ومتاح');
      }

      const repoData = await response.json();
      const files = repoData.tree.filter((item: any) => 
        item.type === 'blob' && 
        (item.path.endsWith('.sol') || 
         item.path.endsWith('.js') || 
         item.path.endsWith('.ts') || 
         item.path.endsWith('.py') ||
         item.path.endsWith('.go') ||
         item.path.endsWith('.rs'))
      );

      const vulnerabilities: Vulnerability[] = [];
      let scannedFiles = 0;

      // Analyze each file
      for (const file of files.slice(0, 20)) { // Limit to first 20 files to avoid API limits
        try {
          const fileResponse = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}/contents/${file.path}`);
          if (fileResponse.ok) {
            const fileData = await fileResponse.json();
            const content = atob(fileData.content);
            scannedFiles++;

            // Check for vulnerability patterns
            vulnerabilityPatterns.forEach(vuln => {
              const matches = content.match(vuln.pattern);
              if (matches) {
                const lines = content.split('\n');
                const matchingLines = lines
                  .map((line, index) => ({ line, index: index + 1 }))
                  .filter(({ line }) => vuln.pattern.test(line));

                matchingLines.forEach(({ line, index }) => {
                  vulnerabilities.push({
                    type: vuln.type,
                    title: vuln.title,
                    description: vuln.description,
                    file: file.path,
                    line: index,
                    code: line.trim(),
                    recommendation: vuln.recommendation
                  });
                });
              }
            });
          }
        } catch (fileError) {
          console.error(`Error analyzing file ${file.path}:`, fileError);
        }
      }

      // Calculate risk score
      const riskScore = vulnerabilities.reduce((score, vuln) => {
        switch (vuln.type) {
          case 'high': return score + 10;
          case 'medium': return score + 5;
          case 'low': return score + 1;
          default: return score;
        }
      }, 0);

      setResult({
        vulnerabilities,
        totalFiles: files.length,
        scannedFiles,
        riskScore
      });

    } catch (error) {
      setError(error instanceof Error ? error.message : 'حدث خطأ أثناء التحليل');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 50) return { level: 'عالي جداً', color: 'bg-red-500', textColor: 'text-red-500' };
    if (score >= 30) return { level: 'عالي', color: 'bg-red-400', textColor: 'text-red-400' };
    if (score >= 15) return { level: 'متوسط', color: 'bg-yellow-500', textColor: 'text-yellow-500' };
    if (score >= 5) return { level: 'منخفض', color: 'bg-blue-500', textColor: 'text-blue-500' };
    return { level: 'آمن', color: 'bg-green-500', textColor: 'text-green-500' };
  };

  const getVulnBadgeColor = (type: string) => {
    switch (type) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Shield className="h-10 w-10 text-purple-400" />
            أداة تحليل الأمان المالي
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            أداة متقدمة لفحص مستودعات GitHub وتحليل الكود بحثاً عن الثغرات الأمنية التي قد تؤدي إلى خسائر مالية
          </p>
        </div>

        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-400" />
              إدخال رابط المستودع
            </CardTitle>
            <CardDescription className="text-gray-400">
              أدخل رابط مستودع GitHub العام للبدء في التحليل الأمني
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                dir="ltr"
              />
              <Button 
                onClick={analyzeRepository}
                disabled={isAnalyzing}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                {isAnalyzing ? 'جاري التحليل...' : 'تحليل المستودع'}
              </Button>
            </div>
            
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {result && (
          <>
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">ملخص التحليل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{result.vulnerabilities.length}</div>
                    <div className="text-gray-400">ثغرات مكتشفة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{result.scannedFiles}</div>
                    <div className="text-gray-400">ملفات مفحوصة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{result.totalFiles}</div>
                    <div className="text-gray-400">إجمالي الملفات</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${getRiskLevel(result.riskScore).textColor}`}>
                      {result.riskScore}
                    </div>
                    <div className="text-gray-400">درجة المخاطر</div>
                    <Badge className={`mt-1 ${getRiskLevel(result.riskScore).color} text-white`}>
                      {getRiskLevel(result.riskScore).level}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.vulnerabilities.length > 0 ? (
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    الثغرات المكتشفة
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    قائمة بجميع الثغرات الأمنية التي تم اكتشافها مع التوصيات لإصلاحها
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.vulnerabilities.map((vuln, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-white">{vuln.title}</h3>
                          <Badge className={getVulnBadgeColor(vuln.type)}>
                            {vuln.type === 'high' ? 'عالي' : vuln.type === 'medium' ? 'متوسط' : 'منخفض'}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-3">{vuln.description}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-400 mb-1">الملف:</div>
                            <div className="text-purple-300 font-mono text-sm flex items-center gap-2">
                              {vuln.file}
                              {vuln.line && <span className="text-gray-400">:{vuln.line}</span>}
                              <ExternalLink className="h-3 w-3" />
                            </div>
                            {vuln.code && (
                              <>
                                <div className="text-sm text-gray-400 mb-1 mt-3">الكود المشبوه:</div>
                                <code className="bg-gray-900 text-red-300 p-2 rounded text-sm block overflow-x-auto">
                                  {vuln.code}
                                </code>
                              </>
                            )}
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">التوصية:</div>
                            <div className="text-green-300 text-sm bg-green-900/20 p-3 rounded border border-green-500/30">
                              {vuln.recommendation}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">لم يتم اكتشاف ثغرات أمنية</h3>
                  <p className="text-gray-400">
                    لم تجد الأداة أي ثغرات أمنية معروفة في الملفات المفحوصة. ولكن يُنصح بإجراء مراجعة أمنية شاملة.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">إخلاء المسؤولية</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2">
            <p>• هذه الأداة تقوم بفحص أساسي للثغرات الشائعة وليست بديلاً عن المراجعة الأمنية المهنية</p>
            <p>• يُنصح بشدة بإجراء مراجعة أمنية شاملة من قبل خبراء أمن قبل نشر أي تطبيق مالي</p>
            <p>• الأداة تفحص الملفات العامة فقط ولا تصل إلى أي معلومات حساسة</p>
            <p>• النتائج قد لا تشمل جميع أنواع الثغرات الأمنية الممكنة</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityAnalyzer;