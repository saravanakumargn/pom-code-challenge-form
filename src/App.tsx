import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserForm from "./user/UserForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserForm />
    </QueryClientProvider>
  );
}

export default App;
