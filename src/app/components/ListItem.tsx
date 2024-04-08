import { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export type ListItemProps = {
  height: number;
  hash: string;
  success: boolean;
  messages: [];
  logs: [];
  block: {
    height: number;
    timestamp: string;
  };
};

export const ListItem = ({ item }: { item: ListItemProps }) => {
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === item.hash}
        onChange={handleChange(item.hash)}
      >
        <AccordionSummary aria-controls="panel1d-content" id={item.hash}>
          <Typography>Hash: {item.hash}</Typography>
          <Typography>Height: {item.height}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Messages:</Typography>
          <div className="max-h-[400px] overflow-auto font-mono max-w-[1200px] bg-slate-300 p-2 rounded-md">
            <pre className="text-xs">
              {JSON.stringify(item.messages, null, 2)}
            </pre>
          </div>
          <Typography>Logs:</Typography>
          <div className="max-h-[400px] overflow-auto font-mono max-w-[1200px] bg-slate-300 p-2 rounded-md">
            <pre className="text-xs">{JSON.stringify(item.logs, null, 2)}</pre>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
