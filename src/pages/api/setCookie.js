// pages/api/setCookie.js

const setCookie = (req, res) => {
  if (req.method === "POST") {
    const { token } = req.body;
    
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);

    // Set the cookie in the response headers with Max-Age
    res.setHeader(
      "Set-Cookie",
      `auth=${token}; Path=/; Expires=${expiryDate.toUTCString()}`
    );
    // Return a JSON response
    return res.status(200).json({ success: true, token });
  } else {
    const token = req.cookies.auth; // Use req.cookies.auth to get the "auth" cookie

    // Return a JSON response
    return res.status(200).json({ success: true, token });
  }
};

export default setCookie;
