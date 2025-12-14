import { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle, ChevronRight, Trophy } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useValoraToast } from '@/hooks/useToast';
import { Lesson } from '@/types/valora';
import { MOCK_LESSONS } from '@/data/mockData';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function LearnPage() {
  const [lessons, setLessons] = useLocalStorage<Lesson[]>('valora-lessons', MOCK_LESSONS);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const { toast } = useValoraToast();

  const completedCount = lessons.filter((l) => l.completed).length;
  const progress = (completedCount / lessons.length) * 100;

  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null || !selectedLesson) return;

    setSelectedAnswer(index);
    const isCorrect = index === selectedLesson.quiz[currentQuestion].correctIndex;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < selectedLesson.quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        setQuizComplete(true);
        // Mark lesson as completed
        setLessons(
          lessons.map((l) =>
            l.id === selectedLesson.id ? { ...l, completed: true } : l
          )
        );
        toast('Keren! Kamu naik 1 langkah jadi lebih paham e-waste.', 'success');
      }
    }, 1500);
  };

  const closeLesson = () => {
    setSelectedLesson(null);
    setShowQuiz(false);
    setQuizComplete(false);
  };

  return (
    <PageTransition>
      <div className="page-container pt-4 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Belajar E-Waste</h1>
          <p className="text-sm text-muted-foreground">
            Tingkatkan pengetahuanmu tentang recovery komponen.
          </p>
        </div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="floating-card p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold">Progres Belajar</p>
              <p className="text-sm text-muted-foreground">
                {completedCount}/{lessons.length} modul selesai
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Lessons List */}
        <div className="space-y-3">
          {lessons.map((lesson, index) => (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedLesson(lesson)}
              className="w-full floating-card p-4 flex items-center justify-between text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    lesson.completed
                      ? 'bg-safe-light'
                      : 'bg-muted'
                  )}
                >
                  {lesson.completed ? (
                    <CheckCircle className="w-6 h-6 text-safe" />
                  ) : (
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{lesson.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{lesson.duration}</span>
                    {lesson.completed && (
                      <span className="px-2 py-0.5 rounded-full bg-safe-light text-safe font-medium">
                        Selesai
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        {/* Lesson Modal */}
        <Dialog open={!!selectedLesson && !showQuiz} onOpenChange={() => closeLesson()}>
          <DialogContent className="max-w-md max-h-[80vh]">
            {selectedLesson && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedLesson.title}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[50vh] pr-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Ringkasan</h4>
                      <p className="text-sm text-muted-foreground">{selectedLesson.summary}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Poin Penting</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          Utamakan keamanan.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          Reuse dulu, recycle kemudian.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          Jika ragu, drop-off resmi.
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
                <Button onClick={startQuiz} className="w-full mt-4">
                  Mulai Quiz
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Quiz Modal */}
        <Dialog open={showQuiz} onOpenChange={() => setShowQuiz(false)}>
          <DialogContent className="max-w-md">
            {selectedLesson && !quizComplete && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    Quiz - Pertanyaan {currentQuestion + 1}/{selectedLesson.quiz.length}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="font-medium">{selectedLesson.quiz[currentQuestion].question}</p>
                  <div className="space-y-2">
                    {selectedLesson.quiz[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={cn(
                          'w-full p-4 rounded-xl text-left text-sm transition-all border',
                          selectedAnswer === null
                            ? 'bg-muted hover:border-primary/50'
                            : index === selectedLesson.quiz[currentQuestion].correctIndex
                            ? 'bg-safe-light border-safe text-safe'
                            : selectedAnswer === index
                            ? 'bg-restricted-light border-restricted text-restricted'
                            : 'bg-muted opacity-50'
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {feedback && (
                    <p
                      className={cn(
                        'text-center font-medium',
                        feedback === 'correct' ? 'text-safe' : 'text-restricted'
                      )}
                    >
                      {feedback === 'correct' ? 'Benar!' : 'Belum tepat.'}
                    </p>
                  )}
                </div>
              </>
            )}

            {quizComplete && (
              <div className="text-center py-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-safe-light flex items-center justify-center mb-4">
                  <Trophy className="w-10 h-10 text-safe" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quiz Selesai!</h3>
                <p className="text-2xl font-bold text-primary mb-4">
                  Skor: {score}/{selectedLesson?.quiz.length}
                </p>
                <Button onClick={closeLesson} className="w-full">
                  Tutup
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
