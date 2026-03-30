import { api } from "./api";

export const createTeam = async (name: string) => {
  return api.post(
    "/team/create",
    { name },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const getTeams = async () => {
  return api.get("/team", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const sendInvite = (teamId: string, username: string, taskId: string) => {
  return api.post("/team/invite", { teamId, username, taskId });
};

export const getInvites = () => {
  return api.get("/team/invites");
};

export const acceptInvite = (inviteId: string) => {
  return api.post("/team/accept", { inviteId });
};