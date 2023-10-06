import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 15,
      },
      smMargin: {
        margin: theme.spacing(1),
      },
      actionDiv: {
        textAlign: 'center',
      },
}));

export default useStyles;