import { SetStateAction, Dispatch } from "react";

export type AlertBox = {
  title: string;
  buttons: Array<{ text: string; onClick?: () => unknown }>;
  body: string;
} | null;

export type AlertBoxContextType = {
  alertBox: AlertBox;
  setAlertBox: Dispatch<SetStateAction<AlertBox>>;
};
