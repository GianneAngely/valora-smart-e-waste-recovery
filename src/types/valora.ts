export type SafetyLevel = 'safe' | 'caution' | 'restricted';

export interface Component {
  id: string;
  name: string;
  label: string;
  category: string;
  safety: SafetyLevel;
  safetyNote: string;
  recoverySteps: string[];
  tools: string[];
  dropoffRequired: boolean;
  imageUrl?: string;
}

export interface Detection {
  label: string;
  confidence: number;
  bbox: [number, number, number, number]; // x, y, width, height
}

export interface DetectionResult {
  detections: Detection[];
  ts: number;
}

export interface MarketListing {
  id: string;
  title: string;
  category: string;
  condition: 'Tested' | 'Untested' | 'For parts' | 'Mixed';
  price: number;
  location: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  saved?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  duration: string;
  completed: boolean;
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  result: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  timestamp: string;
}

export interface ScanHistory {
  id: string;
  summary: string;
  detections: string[];
  timestamp: string;
}

export interface ImpactStats {
  devicesRecovered: number;
  componentsReused: number;
  co2Saved: number;
  wasteReduced: number;
}

export interface UserSettings {
  autoSpeakAfterSummary: boolean;
  fullAnimations: boolean;
  saveScanHistory: boolean;
  onboardingCompleted: boolean;
  voiceRate: number;
}

export interface DropoffCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
}
