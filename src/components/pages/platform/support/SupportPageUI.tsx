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
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  LifeBuoy,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  MoreVertical,
  Edit,
  Trash,
} from 'lucide-react';
import { useSupportPage } from './SupportPageHook';

export default function SupportPageUI(
  props: ReturnType<typeof useSupportPage>
) {
  const {
    isAdmin,
    activeTab,
    setActiveTab,
    ticketTitle,
    setTicketTitle,
    ticketDesc,
    setTicketDesc,
    handleSubmitTicket,
    tickets,
    isModalOpen,
    setIsModalOpen,
    openCreateModal,
    openEditModal,
    handleDeleteTicket,
  } = props;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            IT Support & Helpdesk
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            {isAdmin
              ? 'Manage incoming support requests.'
              : 'Get help with hardware, software, or account issues.'}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <TabsList className="bg-secondary/50 w-full sm:w-auto grid grid-cols-2 sm:flex">
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
          </TabsList>
          <Button
            onClick={openCreateModal}
            className="rounded-2xl font-bold w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" /> Create New Ticket
          </Button>
        </div>

        <TabsContent value="tickets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="flex flex-col hover:border-primary/50 transition-colors group cursor-pointer bg-card"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-muted-foreground bg-secondary px-2 py-1 rounded-md border">
                      {ticket.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          ticket.priority === 'High'
                            ? 'bg-destructive/10 text-destructive border-destructive/20 font-bold'
                            : ticket.priority === 'Medium'
                              ? 'bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold'
                              : 'bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold'
                        }
                      >
                        {ticket.priority} Priority
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditModal(ticket)}
                          >
                            <Edit className="w-4 h-4 mr-2" /> Edit Ticket
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash className="w-4 h-4 mr-2" /> Delete Ticket
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {ticket.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {ticket.desc}
                  </p>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <div className="flex items-center">
                      {ticket.status === 'Resolved' ? (
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      ) : ticket.status === 'In Progress' ? (
                        <Clock className="w-4 h-4 mr-2 text-amber-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 mr-2 text-destructive" />
                      )}
                      <span
                        className={
                          ticket.status === 'Resolved'
                            ? 'text-green-600 dark:text-green-400'
                            : ticket.status === 'In Progress'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-destructive'
                        }
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {ticket.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card className="p-8 text-muted-foreground bg-secondary/10 border-dashed max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-foreground mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-foreground font-semibold">
                  How do I reset my SSO password?
                </AccordionTrigger>
                <AccordionContent>
                  You can reset your SSO password by clicking &quot;Forgot
                  Password&quot; on the main login screen. An email with a reset
                  link will be sent to your registered address.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-foreground font-semibold">
                  My VPN keeps disconnecting, what should I do?
                </AccordionTrigger>
                <AccordionContent>
                  Try switching to a different regional server (e.g., US-East to
                  US-West). If the issue persists, please submit a ticket so our
                  IT team can review your connection logs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-foreground font-semibold">
                  How do I request new hardware?
                </AccordionTrigger>
                <AccordionContent>
                  Hardware requests need approval from your manager. Please use
                  the &quot;Create New Ticket&quot; button and provide details
                  about the hardware you need and your manager&apos;s approval.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border bg-card">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-black">
              Ticket Request
            </DialogTitle>
            <DialogDescription>
              Provide details about the issue so we can help you faster.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Issue Title</label>
              <Input
                placeholder="e.g., Cannot connect to VPN"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                className="bg-secondary/20 h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Description</label>
              <Textarea
                placeholder="Please describe the steps to reproduce the issue..."
                className="min-h-[120px] bg-secondary/20 rounded-xl"
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="bg-secondary/20 p-6 border-t flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitTicket}
              disabled={!ticketTitle.trim() || !ticketDesc.trim()}
              className="rounded-xl"
            >
              <Send className="w-4 h-4 mr-2" /> Save Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
