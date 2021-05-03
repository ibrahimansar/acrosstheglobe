import React from 'react';
import Navigator from "./app/routes/drawer";
// import Search from "./app/screens/Search";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    // <Search />
      <Navigator />
  );
}