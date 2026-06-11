import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  MessageSquarePlus,
  ThumbsUp,
  Star,
  Info,
  Send,
  Plus,
  Edit2,
  Trash2,
  HelpCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import TalentAvatar from '@/components/shared/avatar';
import { Badge } from '@/components/ui/badge';
import { useFeedbackPage } from './FeedbackPageHook';

export default function FeedbackPageUI(
  props: ReturnType<typeof useFeedbackPage>
) {
  const {
    isAdmin,
    activeTab,
    setActiveTab,
    targetPerson,
    setTargetPerson,
    feedbackText,
    setFeedbackText,
    feedbackType,
    setFeedbackType,
    isAddModalOpen,
    setIsAddModalOpen,
    handleSendFeedback,
    openEditModal,
    handleDeleteFeedback,
    closeModal,
    receivedFeedbacks,
    givenFeedbacks,
  } = props;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Peer Feedback
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            {isAdmin
              ? 'Manage feedback templates and view anonymous trends.'
              : 'Give and receive feedback from your colleagues.'}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-secondary/50">
          <TabsTrigger value="received">Received Feedback</TabsTrigger>
          <TabsTrigger value="given">Give Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="received">
          <div className="grid gap-4">
            {receivedFeedbacks.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
                No received feedback yet.
              </div>
            ) : (
              receivedFeedbacks.map((fb) => (
                <Card
                  key={fb.id}
                  className="flex flex-col sm:flex-row gap-4 p-5 hover:border-primary/50 transition-colors border-border/50 group bg-card"
                >
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <TalentAvatar size={48} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {fb.from}
                      </div>
                      <div className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md mt-2 sm:mt-0 w-fit border">
                        {fb.date}
                      </div>
                    </div>
                    <div
                      className={`flex items-center text-sm font-bold w-fit px-2 py-0.5 rounded border ${fb.type === 'Kudos' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' : 'text-blue-500 bg-blue-500/10 border-blue-500/20'}`}
                    >
                      {fb.type === 'Kudos' ? (
                        <Star className="w-3.5 h-3.5 mr-1.5 fill-amber-500" />
                      ) : (
                        <MessageSquarePlus className="w-3.5 h-3.5 mr-1.5" />
                      )}
                      {fb.type}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm bg-secondary/30 p-3 rounded-lg border border-border/50">
                      &quot;{fb.message}&quot;
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="given" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg flex items-center">
              <Send className="w-5 h-5 mr-2 text-primary" /> Feedbacks
              You&apos;ve Given
            </h3>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Give Feedback
            </Button>
          </div>

          <div className="grid gap-4">
            {givenFeedbacks.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
                You haven&apos;t given any feedback yet.
              </div>
            ) : (
              givenFeedbacks.map((fb) => (
                <Card
                  key={fb.id}
                  className="flex flex-col sm:flex-row gap-4 p-5 hover:border-primary/50 transition-colors border-border/50 group bg-card"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                        To: {fb.to}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md mt-2 sm:mt-0 w-fit border">
                          {fb.date}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(fb)}
                            className="h-8 w-8"
                          >
                            <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteFeedback(fb.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4 text-destructive hover:text-destructive/80" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex items-center text-sm font-bold w-fit px-2 py-0.5 rounded border ${fb.type === 'Kudos' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' : 'text-blue-500 bg-blue-500/10 border-blue-500/20'}`}
                    >
                      {fb.type === 'Kudos' ? (
                        <Star className="w-3.5 h-3.5 mr-1.5 fill-amber-500" />
                      ) : (
                        <MessageSquarePlus className="w-3.5 h-3.5 mr-1.5" />
                      )}
                      {fb.type}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm bg-secondary/30 p-3 rounded-lg border border-border/50">
                      &quot;{fb.message}&quot;
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>

          <Card className="mt-12 bg-secondary/10 border-none shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="w-5 h-5 mr-2 text-primary" /> Frequently
                Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What is the difference between Kudos and Review?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Kudos</strong> is used to show appreciation,
                    celebrate wins, or say thank you to a colleague for their
                    help. <strong>Review</strong> is a more formal, constructive
                    feedback typically used during evaluation cycles to provide
                    actionable insights for a colleague&apos;s professional
                    growth.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is my feedback anonymous?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    By default, peer feedback is not anonymous. The recipient
                    and their manager will be able to see who provided the
                    feedback.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Can I edit my feedback after sending?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, you can edit or delete the feedback you have given at
                    any time from the &quot;Feedbacks You&apos;ve Given&quot;
                    section.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Write Feedback</DialogTitle>
            <DialogDescription>
              Recognize a teammate&apos;s hard work or provide constructive
              notes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold">Select Teammate</label>
              <select
                className="w-full bg-background border border-border rounded-md text-sm p-2"
                value={targetPerson}
                onChange={(e) => setTargetPerson(e.target.value)}
              >
                <option value="Elena Rodriguez">Elena Rodriguez</option>
                <option value="Bob Smith">Bob Smith</option>
                <option value="Alice Freeman">Alice Freeman</option>
                <option value="John Doe">John Doe</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold">
                Select Feedback Type
              </label>
              <div className="flex gap-2">
                <Badge
                  variant={feedbackType === 'Kudos' ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-1.5 text-sm ${feedbackType === 'Kudos' ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500' : ''}`}
                  onClick={() => setFeedbackType('Kudos')}
                >
                  <Star className="w-3.5 h-3.5 mr-1.5" /> Kudos
                </Badge>
                <Badge
                  variant={feedbackType === 'Review' ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-1.5 text-sm ${feedbackType === 'Review' ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' : ''}`}
                  onClick={() => setFeedbackType('Review')}
                >
                  <MessageSquarePlus className="w-3.5 h-3.5 mr-1.5" /> Peer
                  Review
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {feedbackType === 'Kudos'
                  ? 'Use Kudos to celebrate wins and show appreciation.'
                  : 'Use Review for constructive feedback and performance evaluation.'}
              </p>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold">Your Message</label>
              <Textarea
                placeholder="Describe what they did well..."
                className="min-h-[120px] bg-secondary/20"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSendFeedback}
              disabled={!feedbackText.trim()}
            >
              <Send className="w-4 h-4 mr-2" /> Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
