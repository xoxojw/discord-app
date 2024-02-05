const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="bg-red-200 h-full">
      {children}
    </div>
  );
}
 
export default AuthLayout;