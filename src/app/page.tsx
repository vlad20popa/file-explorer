import FileExplorer from "@/components/fileExplorer/FileExplorer";
import {mockData} from "@/mockdata/mockData";

export default function Home() {
  return (
    <main className="flex bg-white min-h-screen flex-col w-full items-center justify-between p-24">
      <FileExplorer files={mockData}/>
    </main>
  );
}
