import { SetStateAction, Dispatch } from "react";

export type AlertBox = {
  title: string | React.ReactNode;
  buttons: Array<{ text: string; onClick?: () => unknown }>;
  body: string | React.ReactNode;
} | null;

export type AlertBoxContextType = {
  alertBox: AlertBox;
  setAlertBox: Dispatch<SetStateAction<AlertBox>>;
};
