import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Resumes: undefined;
  Profile: undefined;
  Compatibility: undefined;
  About: undefined;
};

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  AppTabs: NavigatorScreenParams<AppTabParamList>;
  Personalize: undefined;
  AnalysisResult: {
    score: number;
    matchSkills: string[];
    gapSkills: string[];
    recommendedCourses: { title: string; url: string }[];
   
  };
   ResumeForm: { resume?: any } | undefined;
};
