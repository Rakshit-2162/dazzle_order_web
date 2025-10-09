import { useCallback, useEffect, useState } from "react";
import TextNavbar from "../../components/common/TextNavbar";
import type { DistributorJSON } from "../../models/Distributor";
import { fetchAllDistributors } from "../../services/ApiServices";
import { showSnackbar } from "../../services/snackbarService";
import { AddRounded, ErrorOutlineRounded } from "@mui/icons-material";
import ShowAllDistributorsTable from "./components/ShowAllDistributorsTable";
import { Box, Fab } from "@mui/material";
import DrawerAddDistributor from "./components/DrawerAddDistributor";

function MyDistributors() {
  const [distributors, setDistributors] = useState<DistributorJSON[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);

  const getDistributors = useCallback(async () => {
    try {
      setLoading(true);
      const data: DistributorJSON[] = await fetchAllDistributors();
      setDistributors(data ?? []);
    } catch (err) {
      showSnackbar(
        "Error fetching distributors: " + err,
        "error",
        <ErrorOutlineRounded />
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDistributors();
  }, [getDistributors]);

  return (
    <>
      <TextNavbar label={"My Distributors"} color={"transparent"} />

      <Box m={4}>
        <ShowAllDistributorsTable
          distributors={distributors}
          onUpdate={getDistributors}
        />
        <Fab
          onClick={() => setShowCreateDrawer(true)}
          color="primary"
          aria-label="Add"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
          }}
        >
          <AddRounded sx={{ fontSize: 28 }} />
        </Fab>
      </Box>

      <DrawerAddDistributor
        open={showCreateDrawer}
        onClose={() => {
          setShowCreateDrawer(false);
          getDistributors();
        }}
      />
    </>
  );
}

export default MyDistributors;
