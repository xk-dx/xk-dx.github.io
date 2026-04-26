import { getHomeData } from "@/lib/home";
import HomeClient from "./HomeClient";

export default function Home() {
  const data = getHomeData();
  return <HomeClient data={data} />;
}
