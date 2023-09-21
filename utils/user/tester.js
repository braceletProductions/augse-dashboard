export const verifier = async (token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/verifyUserType`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.userType;
  } catch (error) {
    console.error("Error in verifier:", error);
    return "failed"; // You can customize this error handling as needed
  }
};
