import Dashboard from "../components/Dashboard";
import GameScreen from "../components/game/Game";
import Welcome from "../components/game/Welcome";
import ActivatoinLink from "../components/Paying/Activation";


export const routes = [
 
  {
    path: "/home",
    element: (
        <Dashboard />
    ),
  },
  {
    path: "/activation",
    element: (
        <ActivatoinLink />
    ),
  },
  {
    path: "/welcome",
    element: (
        <Welcome />
    ),
  },
   {
    path: "/game",
    element: (
        <GameScreen />
    ),
  },
  
]