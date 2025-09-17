import Navbar from "../../components/common/Navbar";
// import { useNavigate } from "react-router-dom";

function DashboardPage() {
  //   const navigate = useNavigate();
  return (
    <>
      <Navbar
        buttons={[
          {
            label: "Logout",
            onClick: () => {},
            type: "primary",
          },
        ]}
      />
    </>
  );
}

export default DashboardPage;
