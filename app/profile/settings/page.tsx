"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save } from "lucide-react"
import { mockUserProfile } from "@/lib/data/user-profile"

export default function SettingsPage() {
  const [profile, setProfile] = useState(mockUserProfile)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Account Settings */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select value={profile.country} onValueChange={(value) => setProfile({ ...profile, country: value })}>
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Learning Preferences */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Learning Preferences</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="nativeLanguage">Native Language</Label>
                <Select
                  value={profile.nativeLanguage}
                  onValueChange={(value) => setProfile({ ...profile, nativeLanguage: value })}
                >
                  <SelectTrigger id="nativeLanguage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="targetLanguage">Target Language</Label>
                <Select
                  value={profile.targetLanguage}
                  onValueChange={(value) => setProfile({ ...profile, targetLanguage: value })}
                >
                  <SelectTrigger id="targetLanguage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="learningGoal">Learning Goal</Label>
                <Select
                  value={profile.learningGoal}
                  onValueChange={(value) => setProfile({ ...profile, learningGoal: value })}
                >
                  <SelectTrigger id="learningGoal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic conversation">Basic conversation</SelectItem>
                    <SelectItem value="Travel fluency">Travel fluency</SelectItem>
                    <SelectItem value="Professional fluency">Professional fluency</SelectItem>
                    <SelectItem value="Native-like fluency">Native-like fluency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dailyGoal">Daily Goal (minutes)</Label>
                <Select
                  value={profile.dailyGoalMinutes.toString()}
                  onValueChange={(value) => setProfile({ ...profile, dailyGoalMinutes: Number.parseInt(value) })}
                >
                  <SelectTrigger id="dailyGoal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates via email</div>
                </div>
                <Switch
                  checked={profile.notifications.email}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, email: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive push notifications</div>
                </div>
                <Switch
                  checked={profile.notifications.push}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, push: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Daily Reminder</div>
                  <div className="text-sm text-muted-foreground">Get reminded to practice daily</div>
                </div>
                <Switch
                  checked={profile.notifications.dailyReminder}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, dailyReminder: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly Report</div>
                  <div className="text-sm text-muted-foreground">Receive weekly progress reports</div>
                </div>
                <Switch
                  checked={profile.notifications.weeklyReport}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, weeklyReport: checked },
                    })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Privacy */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Show Profile</div>
                  <div className="text-sm text-muted-foreground">Make your profile visible to others</div>
                </div>
                <Switch
                  checked={profile.privacy.showProfile}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      privacy: { ...profile.privacy, showProfile: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Show Progress</div>
                  <div className="text-sm text-muted-foreground">Display your learning progress publicly</div>
                </div>
                <Switch
                  checked={profile.privacy.showProgress}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      privacy: { ...profile.privacy, showProgress: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Show on Leaderboard</div>
                  <div className="text-sm text-muted-foreground">Appear in global rankings</div>
                </div>
                <Switch
                  checked={profile.privacy.showOnLeaderboard}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      privacy: { ...profile.privacy, showOnLeaderboard: checked },
                    })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-destructive/50">
            <h2 className="text-2xl font-bold mb-6 text-destructive">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Delete Account</div>
                  <div className="text-sm text-muted-foreground">Permanently delete your account and all data</div>
                </div>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
