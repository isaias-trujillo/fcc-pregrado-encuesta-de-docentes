import ProfessorCard from "@/components/app/cards/professor.card";
import ServicesCard from "@/components/app/cards/services.card";
import Navbar from "@/components/app/navbar.tsx";

const DashboardPage = () => {
  return (
    <main className="bg-background flex flex-col flex-wrap items-center justify-center rounded-md gap-6 p-6">
      <Navbar />
      <section className="flex flex-row flex-wrap gap-4">
        <ProfessorCard />
        <ServicesCard />
      </section>
    </main>
  );
};

export default DashboardPage;
