import Dashboard from "../components/Dashboard";
import GameScreen from "../components/game/Game";
import Welcome from "../components/game/Welcome";


export const routes = [
  {
    path: "/dashboard",
    element: (
        <Dashboard />
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