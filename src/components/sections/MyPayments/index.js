import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const dummyPayments = [
  { id: 1, date: "2023-01-01", amount: 50.0, status: "Completed" },
  { id: 2, date: "2023-02-01", amount: 75.0, status: "Pending" },
  { id: 3, date: "2023-03-01", amount: 30.0, status: "Failed" },
  { id: 4, date: "2023-04-01", amount: 100.0, status: "Completed" },
  { id: 5, date: "2023-05-01", amount: 60.0, status: "Pending" },
  { id: 6, date: "2023-06-01", amount: 45.0, status: "Completed" },
  { id: 7, date: "2023-07-01", amount: 80.0, status: "Failed" },
  // Add more payment data as needed
];

const MyPayments = ({ payments }) => {
  return (
    <Container style={{ maxWidth: "100%", padding: "10px" }}>
      <Grid container gap={2}>
        {dummyPayments.map((payment) => (
          <Grid item xs={3} sm={3} md={3} key={payment.id}>
            <Card
              sx={{
                width: 300,
                border: "1px solid green",
                "@media (max-width: 600px)": {
                  width: "100%", // Full width on small screens
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">Date: {payment.date}</Typography>
                <Typography variant="body1">
                  Amount: ${payment.amount}
                </Typography>
                <Typography variant="body2">
                  Status: {payment.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyPayments;
