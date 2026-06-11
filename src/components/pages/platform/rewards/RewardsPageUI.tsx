import React from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Gift,
  Coins,
  TrendingUp,
  History,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRewardsPage } from './RewardsPageHook';

export default function RewardsPageUI(
  props: ReturnType<typeof useRewardsPage>
) {
  const {
    isAdmin,
    activeTab,
    setActiveTab,
    userPoints,
    expiringPoints,
    rewards,
    transactions,
  } = props;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Rewards & Perks
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            {isAdmin
              ? 'Manage reward inventory and point allocations.'
              : 'Redeem your earned points for gifts and experiences.'}
          </p>
        </div>
        {isAdmin && (
          <Button className="shrink-0 shadow-sm">
            <Gift className="w-4 h-4 mr-2" />
            Add Reward
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-sm md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-primary">
              <Coins className="w-5 h-5 mr-2" /> My Point Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground flex items-baseline gap-2">
              {userPoints}{' '}
              <span className="text-sm font-medium text-muted-foreground">
                pts
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                className="w-full text-xs shadow-sm bg-primary/90 hover:bg-primary"
                size="sm"
              >
                Redeem Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 flex flex-col justify-center bg-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">How to earn more points?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" /> Receive
                kudos from a peer (+50 pts)
              </li>
              <li className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" /> Complete
                compliance training early (+100 pts)
              </li>
              <li className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" /> Work
                anniversary (+500 pts)
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-secondary/50">
          <TabsTrigger value="catalog">Reward Catalog</TabsTrigger>
          <TabsTrigger value="history">Point History</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card
                key={reward.id}
                className="flex flex-col hover:border-primary/50 hover:shadow-md transition-all group bg-card"
              >
                <div className="h-32 bg-secondary/50 flex items-center justify-center rounded-t-xl group-hover:bg-primary/5 transition-colors">
                  <Gift className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
                </div>
                <CardHeader className="pb-2">
                  <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">
                    {reward.category}
                  </div>
                  <CardTitle className="text-lg line-clamp-1">
                    {reward.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <div className="font-bold flex items-center text-amber-500 bg-amber-500/10 w-fit px-2.5 py-1 rounded-md text-sm border border-amber-500/20">
                    <Coins className="w-4 h-4 mr-1.5" /> {reward.points} pts
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    className="w-full shadow-sm"
                    disabled={userPoints < reward.points}
                  >
                    {userPoints >= reward.points
                      ? 'Redeem Reward'
                      : 'Not enough points'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <History className="w-5 h-5 mr-2 text-muted-foreground" />{' '}
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 hover:bg-secondary/30 rounded-lg transition-colors border border-transparent hover:border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'earned' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}
                      >
                        {tx.type === 'earned' ? (
                          <ArrowUpRight className="w-5 h-5" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{tx.desc}</p>
                        <p className="text-xs text-muted-foreground">
                          {tx.date}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`font-bold ${tx.type === 'earned' ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}
                    >
                      {tx.points} pts
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
