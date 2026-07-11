import Sidebar from "./Sidebar";

export default function PageLayout() {
  return (
    <div className="w-screen h-screen bg-secondary">
      <div className=" flex p-4 gap-4 h-full">
        <Sidebar />

        <section
          id="body"
          className="bg-white p-4 rounded-xl h-full w-full shadow-md "
        ></section>
      </div>
    </div>
  );
}
