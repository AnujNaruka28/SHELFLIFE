import useAuthAndHouseholdCheck from "../../hooks/useAuthAndHouseholdCheck";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const {hasHousehold,loading} = useAuthAndHouseholdCheck();
  // Show loading while checking
  if (hasHousehold === null || loading) {
    return <Loader/>;
  }
  // Only render children if user has household
  return hasHousehold ? <>{children}</> : null;
};

export default ProtectedRoute;
