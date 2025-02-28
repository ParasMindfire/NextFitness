"use server"



// services/auth.ts
export const loginUser = async (data: { email: string; password: string }) => {
    const response = await fetch(`${process.env.API_BASE_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Login failed");
    return result;
  };


export const signupUser = async (data: { email: string; password: string;name:string;phone:string;address:string }) => {

    console.log("kya daat aaya singup ",data);

    const response = await fetch(`${process.env.API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Login failed");
    return result;
  };
  