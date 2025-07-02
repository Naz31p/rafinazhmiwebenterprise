import MahasiswaPage from "./MahasiswaPage";
import DosenPage from "./DosenPage";
import ModulPage from "./ModulPage";
import KelasPage from "./KelasPage";
import MahasiswaModulPage from "./MahasiswaModulPage";

export default function Home() {
  return (
    <div className="p-6 space-y-12">
      <div className="bg-white rounded-xl p-4 shadow">
        <MahasiswaPage />
      </div>
      <div className="bg-white rounded-xl p-4 shadow">
        <DosenPage />
      </div>
      <div className="bg-white rounded-xl p-4 shadow">
        <ModulPage />
      </div>
      <div className="bg-white rounded-xl p-4 shadow">
        <KelasPage />
      </div>
      <div className="bg-white rounded-xl p-4 shadow">
        <MahasiswaModulPage />
      </div>
    </div>
  );
}
