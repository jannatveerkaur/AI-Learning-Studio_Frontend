import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Lightbulb, Trophy, Loader2, CheckCircle, XCircle, Youtube, Sparkles, Brain, RotateCcw, BookOpen } from 'lucide-react';

const LearningWorkspace = () => {
  const [inputMode, setInputMode] = useState('url');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [processingStep, setProcessingStep] = useState('');

  const API_BASE = process.env.REACT_APP_API_URL || 'https://ai-learning-studio-backend.onrender.com';

  useEffect(() => {
    if (loading) {
      const steps = [
        'Analyzing content...',
        'Extracting key concepts...',
        'Generating summary...',
        'Creating quiz questions...',
        'Finalizing materials...'
      ];
      let currentStep = 0;
      const interval = setInterval(() => {
        setProcessingStep(steps[currentStep]);
        currentStep = (currentStep + 1) % steps.length;
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setProcessingStep('');
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted, input mode:', inputMode);
    setLoading(true);
    setError(null);
    setData(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setProcessingStep('Starting analysis...');

    try {
      let response;
      if (inputMode === 'url') {
        console.log('Processing YouTube URL:', youtubeUrl);
        response = await axios.post(`${API_BASE}/process-video`, {
          youtube_url: youtubeUrl
        });
      } else {
        console.log('Processing transcript, length:', transcript.length);
        if (transcript.length < 100) {
          throw new Error('Transcript must be at least 100 characters');
        }
        response = await axios.post(`${API_BASE}/process-transcript`, {
          transcript: transcript,
          video_title: videoTitle || 'Video Learning Materials'
        });
      }
      console.log('Response received:', response.data);
      setData(response.data);
      setActiveTab('summary');
      
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      console.error('Error occurred:', err);
      setError(err.response?.data?.detail || err.message || 'An error occurred');
    } finally {
      setLoading(false);
      setProcessingStep('');
    }
  };

  const resetWorkspace = () => {
    setData(null);
    setError(null);
    setYoutubeUrl('');
    setTranscript('');
    setVideoTitle('');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  const handleQuizAnswer = (questionIndex, option) => {
    if (!quizSubmitted) {
      setQuizAnswers({ ...quizAnswers, [questionIndex]: option });
    }
  };

  const submitQuiz = () => {
    let correctCount = 0;
    data.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correct_answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setQuizSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  AI Learning Studio
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Transform content into knowledge</p>
              </div>
            </div>
            {data && (
              <button
                onClick={resetWorkspace}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">New Session</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8 bg-gradient-to-br from-white to-primary-50/30 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-sm">
        <div className="relative mb-8">
          <div className="flex space-x-3 bg-gray-100 dark:bg-gray-900/50 p-2 rounded-xl">
            <button
              onClick={() => setInputMode('url')}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform ${
                inputMode === 'url'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-xl scale-105'
                  : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Youtube className="w-5 h-5 inline mr-2" />
              YouTube URL
            </button>
            <button
              onClick={() => setInputMode('transcript')}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform ${
                inputMode === 'transcript'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-xl scale-105'
                  : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Paste Transcript
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {inputMode === 'url' ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🎬 YouTube Video URL
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="input-field"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📝 Video Title (Optional)
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="input-field"
                  placeholder="Enter a title for your content"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📄 Paste Transcript or Educational Content
                </label>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="input-field min-h-[200px] font-mono text-sm"
                  placeholder="Paste your video transcript or educational text here..."
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {transcript.length} characters (minimum 100)
                </p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="relative mt-6 w-full py-4 px-6 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 hover:from-primary-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative flex items-center justify-center space-x-3">
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <div className="flex flex-col items-start">
                    <span className="text-lg">Processing...</span>
                    {processingStep && (
                      <span className="text-xs text-white/80">{processingStep}</span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  <span className="text-lg">Generate AI Learning Materials</span>
                  <Sparkles className="w-6 h-6" />
                </>
              )}
            </div>
          </button>
        </form>

        {error && (
          <div className="mt-6 p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-start space-x-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-900 dark:text-red-300 mb-1">Error</p>
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}
      </div>

      {data && (
        <div id="results-section" className="animate-fadeIn bg-gradient-to-br from-white to-primary-50/20 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-white">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">AI Processing Complete!</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              <TabButton
                icon={<FileText className="w-5 h-5" />}
                label="Summary"
                active={activeTab === 'summary'}
                onClick={() => setActiveTab('summary')}
              />
              <TabButton
                icon={<Lightbulb className="w-5 h-5" />}
                label="Key Insights"
                active={activeTab === 'insights'}
                onClick={() => setActiveTab('insights')}
              />
              <TabButton
                icon={<BookOpen className="w-5 h-5" />}
                label="Notes"
                active={activeTab === 'notes'}
                onClick={() => setActiveTab('notes')}
              />
              <TabButton
                icon={<Trophy className="w-5 h-5" />}
                label="Quiz"
                active={activeTab === 'quiz'}
                onClick={() => setActiveTab('quiz')}
                badge={quizSubmitted ? `${score}/${data.quiz?.length}` : null}
              />
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'summary' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {data.video_title}
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"></div>
                </div>
                <div className="space-y-5">
                  {data.summary.split('\n\n').map((paragraph, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg flex-1">
                          {paragraph}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="animate-fadeIn">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    💡 Key Insights
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                </div>
                <div className="grid gap-4">
                  {data.key_points.map((point, index) => (
                    <div
                      key={index}
                      className="group relative p-5 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 rounded-2xl border-2 border-yellow-300 dark:border-yellow-700/50 hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 flex-1 pt-2 font-medium leading-relaxed">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="animate-fadeIn">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    📚 Detailed Study Notes
                  </h3>
                  <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                </div>
                <div className="space-y-5">
                  {data.notes?.map((note, index) => (
                    <div
                      key={index}
                      className="group relative p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl border-l-4 border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base">
                            {note}
                          </p>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Lightbulb className="w-5 h-5 text-indigo-500" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/5 to-purple-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-2xl border-2 border-blue-300 dark:border-blue-700 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                      <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">Study Tip</p>
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        These detailed notes provide comprehensive explanations with examples and real-world context to help you master the material.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="animate-fadeIn">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                    🏆 Knowledge Check
                  </h3>
                  <div className="h-1 w-28 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <div className="space-y-6">
                  {data.quiz.map((question, qIndex) => (
                    <div
                      key={qIndex}
                      className="p-6 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ animationDelay: `${qIndex * 0.05}s` }}
                    >
                      <div className="flex items-start space-x-3 mb-5">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                          {qIndex + 1}
                        </div>
                        <p className="font-bold text-lg text-gray-900 dark:text-white flex-1 pt-1">
                          {question.question}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => {
                          const isSelected = quizAnswers[qIndex] === option;
                          const isCorrect = question.correct_answer === option;
                          const showResult = quizSubmitted;

                          let buttonClass = 'w-full text-left p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer transform ';
                          if (!showResult) {
                            buttonClass += isSelected
                              ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 shadow-md scale-105'
                              : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-102';
                          } else {
                            if (isCorrect) {
                              buttonClass += 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 shadow-lg';
                            } else if (isSelected && !isCorrect) {
                              buttonClass += 'border-red-500 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 shadow-lg';
                            } else {
                              buttonClass += 'border-gray-300 dark:border-gray-600 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={oIndex}
                              onClick={() => handleQuizAnswer(qIndex, option)}
                              className={buttonClass}
                              disabled={quizSubmitted}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                                    showResult && isCorrect ? 'bg-green-500 text-white shadow-lg' :
                                    showResult && isSelected && !isCorrect ? 'bg-red-500 text-white shadow-lg' :
                                    isSelected ? 'bg-purple-500 text-white shadow-md' :
                                    'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                  }`}>
                                    {String.fromCharCode(65 + oIndex)}
                                  </div>
                                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                                    {option}
                                  </span>
                                </div>
                                {showResult && isCorrect && (
                                  <CheckCircle className="w-6 h-6 text-green-600 animate-bounce" />
                                )}
                                {showResult && isSelected && !isCorrect && (
                                  <XCircle className="w-6 h-6 text-red-600 animate-shake" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {!quizSubmitted && (
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                      <div className="flex items-center space-x-3">
                        <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-semibold text-purple-900 dark:text-purple-200">
                          Progress: {Object.keys(quizAnswers).length}/{data.quiz.length} questions answered
                        </span>
                      </div>
                      <div className="flex-1 mx-4 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                          style={{ width: `${(Object.keys(quizAnswers).length / data.quiz.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length !== data.quiz.length}
                      className="w-full py-5 px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold text-lg rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center space-x-3 overflow-hidden relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <Trophy className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">Submit Quiz & See Results</span>
                      <Sparkles className="w-6 h-6 relative z-10" />
                    </button>
                  </div>
                )}

                {quizSubmitted && (
                  <div className="mt-8 p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-orange-900/30 rounded-3xl border-4 border-purple-300 dark:border-purple-700 shadow-2xl animate-slideInUp">
                    <div className="text-center">
                      <div className="inline-block p-6 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full mb-6 animate-bounce shadow-2xl">
                        <Trophy className="w-20 h-20 text-white" />
                      </div>
                      <h4 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
                        {score === data.quiz.length ? 'Perfect Score! 🎉' : score >= data.quiz.length * 0.7 ? 'Great Job! 👏' : 'Keep Learning! 📚'}
                      </h4>
                      <p className="text-2xl text-gray-700 dark:text-gray-300 mb-6">
                        You scored <span className="font-bold text-3xl text-purple-600 dark:text-purple-400">{score}</span> out of <span className="font-bold text-3xl">{data.quiz.length}</span> questions
                      </p>
                      <div className="flex items-center justify-center space-x-6 mb-6">
                        <div className="flex items-center space-x-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-xl shadow-lg">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <span className="font-bold text-green-700 dark:text-green-300">{score} Correct</span>
                        </div>
                        <div className="flex items-center space-x-2 px-6 py-3 bg-red-100 dark:bg-red-900/30 rounded-xl shadow-lg">
                          <XCircle className="w-6 h-6 text-red-600" />
                          <span className="font-bold text-red-700 dark:text-red-300">{data.quiz.length - score} Incorrect</span>
                        </div>
                      </div>
                      <div className="relative pt-6">
                        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                          <div 
                            className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 h-4 rounded-full transition-all duration-1000 shadow-lg"
                            style={{ width: `${(score / data.quiz.length) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mt-2">
                          {Math.round((score / data.quiz.length) * 100)}% Accuracy
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ icon, label, badge, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all border-b-4 ${
      active
        ? 'border-primary-600 bg-white dark:bg-gray-800 text-primary-600'
        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
    }`}
  >
    {icon}
    <span>{label}</span>
    {badge && (
      <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full font-bold">
        {badge}
      </span>
    )}
  </button>
);

export default LearningWorkspace;
