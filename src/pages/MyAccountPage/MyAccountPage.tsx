import Navbar from "../../components/common/Navbar";

function MyAccountPage() {
  return (
    <>
      <Navbar
        buttons={[{ label: "My Account", onClick: () => {}, type: "text" }]}
      />
    </>
  );
}

export default MyAccountPage;
