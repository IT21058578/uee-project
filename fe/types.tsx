import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  children: undefined;
  BottomTab: undefined;
  CTasks: undefined;
  PersonalRoomSchedule: undefined;
  AdminRoomDetail:undefined;
  RoomManagmentProfileSetti:undefined;
  Settings:undefined;
  EditTask: undefined;
  AdminRoom: undefined;
  EditRoom: undefined;
  CreateRoom: undefined;
  TaskDetail: undefined;
  RoomDetails: undefined;
  AddTask: undefined;
  Screen1: undefined;
  Screen2: undefined;
  Screen3: undefined;
  Screen4: undefined;
};

//schedule types
export type scheduleTypes = {
  id: number;
  title: String;
  startTime: String;
  endTime: String;
  date: String;
  room: String;
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;



  //Bottom nav types 

  export enum TabElementDisplayOptions {
    ICON_ONLY = "icon-only",
    LABEL_ONLY = 'label-only',
    BOTH = 'both'
}

export enum DotSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    DEFAULT = 'default' // not in docs
}

export enum TabButtonLayout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal'
}


export interface IAppearanceOptions {
    topPadding: number;
    bottomPadding: number;
    horizontalPadding: number;
    tabBarBackground: string;
    activeTabBackgrounds?: string | string[];
    activeColors?: string | string[];
    floating: boolean;
    dotCornerRadius: number;
    whenActiveShow: TabElementDisplayOptions;
    whenInactiveShow: TabElementDisplayOptions;
    dotSize: DotSize;
    shadow: boolean;
    tabButtonLayout: TabButtonLayout
}

//Soft Tab Two
export interface TabTwoAppearanceOptions {
  topPadding: number;
  bottomPadding: number;
  horizontalPadding: number;
  tabBarBackground: string;
  activeTabBackgrounds?: string | string[];
  activeColors?: string | string[];
  activeTabColors?: string | string[];
  dotSize?: DotSize;
  tabButtonLayout: TabButtonLayout
}

// Room Types

interface Task {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
}

interface Member {
  id: number;
  name: string;
}

interface Admin {
  id: number;
  name: string;
}

export interface RoomType {
  id: number;
  name: string;
  tasks: Task[];
  members: Member[];
  admins: Admin[];
}

//
export type popTypes = {
  text: undefined;
  iconName: undefined;
  value: undefined;
}