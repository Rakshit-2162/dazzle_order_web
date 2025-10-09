import {
  CloseRounded,
  ErrorOutlineRounded,
  TaskAltRounded,
} from "@mui/icons-material";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createDistributorSchema } from "../../../components/MySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { showSnackbar } from "../../../services/snackbarService";
import MyTextField from "../../../components/common/MyTextField";
import PrimaryButton from "../../../components/common/PrimaryButton";
import { createDistributor } from "../../../services/ApiServices";
import { delay } from "../../../utills/delay";

type FormData = yup.InferType<typeof createDistributorSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

function DrawerAddDistributor({ open, onClose }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(createDistributorSchema),
    defaultValues: {
      distributor_id: "",
      user_name: "",
      user_mobile: "",
      user_password: "123456",
      user_company_name: "",
      city_state: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      const response = await createDistributor(data);
      if (response["success"]) {
        showSnackbar(response["message"], "success", <TaskAltRounded />);
        await delay(3000);
        reset();
        onClose();
      } else {
        showSnackbar(response["message"] || "Error occurred", "error", <ErrorOutlineRounded />);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showSnackbar("Error", "error", <ErrorOutlineRounded />);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
          },
          paper: {
            sx: {
              width: isMobile ? "100%" : "50vw", // ✅ full width for mobile, half screen for laptop
              p: 3,
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              boxShadow: 6,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.default
                  : theme.palette.background.paper,
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4">Add Distributor</Typography>
          <IconButton onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Content */}
        <Box>
          {/* Replace this with your actual form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <MyTextField
              name={"distributor_id"}
              control={control}
              placeholder="Distributor ID"
              label="Distributor ID"
              type="number"
            />
            <MyTextField
              name={"user_name"}
              control={control}
              placeholder="Distributor Name"
              label="Distributor Name"
            />
            <MyTextField
              name={"user_mobile"}
              control={control}
              placeholder="Mobile"
              label="Mobile"
              type="number"
            />
            <MyTextField
              name={"user_company_name"}
              control={control}
              placeholder="Company Name"
              label="Company Name"
            />
            <MyTextField
              name={"city_state"}
              control={control}
              placeholder="Location"
              label="Location"
            />

            <PrimaryButton
              label={"Submit"}
              type="submit"
              sx={{
                width: "100%",
                my: 4,
                py: 1.5,
                borderRadius: 3,
              }}
            />
          </form>
        </Box>
      </Drawer>
    </>
  );
}

export default DrawerAddDistributor;
