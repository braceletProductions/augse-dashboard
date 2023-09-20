const logout = (req, res) => {
    // Set the cookie's expiration date to a date in the past
    const pastDate = new Date(0);
  
    // Set the "auth" cookie to null with an expired date
    res.setHeader("Set-Cookie", `auth=null; Path=/; Expires=${pastDate.toUTCString()}`);
  
    return res.status(200).json({ success: true });
  };
  
  export default logout;
  