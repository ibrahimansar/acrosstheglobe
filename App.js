import React from 'react';
import Navigator from "./app/routes/drawer";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  return (
      <Navigator />
  );
}