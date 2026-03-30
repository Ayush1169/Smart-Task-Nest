"use client";

import { useEffect, useState } from "react";
import { createTeam, getTeams, sendInvite } from "@/services/team.service";
import { api } from "@/services/api";

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [taskMap, setTaskMap] = useState<any>({});
  const [tasks, setTasks] = useState<any[]>([]);
  const [activeTeam, setActiveTeam] = useState("");

  const loadTeams = async () => {
    try {
      const res = await getTeams();
      setTeams(res.data);
    } catch (err) {
      console.error("Fetch teams error", err);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  // 🔥 LOAD TASKS
 useEffect(() => {
  api.get("/tasks")
    .then((res) => {
      const data = res.data;

      if (Array.isArray(data)) {
        setTasks(data);
      } else if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        setTasks([]);
      }
    })
    .catch(() => setTasks([]));
}, []);

  const handleCreate = async () => {
    if (!name) return;

    try {
      setLoading(true);
      await createTeam(name);
      setName("");
      loadTeams();
    } catch (err) {
      console.error("Create team error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
  setSearch(value);

  try {
    const res = await api.get(`/user/search?query=${value}`);

    setResults(Array.isArray(res.data) ? res.data : []);

  } catch (err) {
    console.log("Search error:", err);
    setResults([]);
  }
};

  return (
    <div>
      <h1 className="text-3xl font-semibold text-black mb-6">Teams</h1>

      {/* CREATE TEAM */}
      <div className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter team name"
          className="border px-3 py-2 rounded-lg w-64 text-black"
        />

        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? "Creating..." : "Create Team"}
        </button>
      </div>

      {/* TEAM LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.length === 0 ? (
          <p className="text-gray-500">No teams yet</p>
        ) : (
          teams.map((team) => (
            <div
              key={team._id}
              className="bg-white p-5 rounded-2xl shadow-sm border"
            >
              <h2 className="font-semibold text-lg text-black">
                {team.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                👥 {team.members.length} members
              </p>

              {/* MEMBERS */}
              <div className="mt-2 text-sm text-gray-600">
                {team.members.map((m: any) => (
                  <p key={m._id}>• {m.user?.email}</p>
                ))}
              </div>

              {/* SEARCH INPUT */}
              
              <input
  placeholder="Search username"
  value={activeTeam === team._id ? search : ""}
  onFocus={() => {
    setActiveTeam(team._id);
    handleSearch(""); // 🔥 click pe sab users dikhe
  }}
  onChange={(e) => {
    setActiveTeam(team._id);
    handleSearch(e.target.value);
  }}
  className="border px-2 py-2 rounded text-black mt-3 w-full"
/>

              {/* SEARCH RESULTS */}           
              {activeTeam === team._id && (
  <div className="border mt-1 rounded bg-white shadow max-h-40 overflow-y-auto">

    {search === "" ? (
      <p className="p-2 text-gray-400">Type to search users 🔍</p>
    ) : results.length > 0 ? (
      results.map((u: any) => (
        <div
          key={u._id}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={async () => {
            if (!taskMap[team._id]) {
              alert("Select task first ❌");
              return;
            }

            await sendInvite(team._id, u.email, taskMap[team._id]);

            alert("Invite sent 🚀");
            setSearch("");
            setResults([]);
          }}
        >
          <div>
  <p className="font-medium">{u.name}</p>
  <p className="text-sm text-gray-500">{u.email}</p>
</div>
        </div>
      ))
    ) : (
      <p className="p-2 text-gray-400">No user found ❌</p>
    )}

  </div>
)}
              {/* TASK SELECT */}
              <select
                onChange={(e) =>
                  setTaskMap({
                    ...taskMap,
                    [team._id]: e.target.value,
                  })
                }
                className="border mt-2 w-full text-black rounded px-2 py-2"
              >
                <option>Select Task</option>
                {Array.isArray(tasks) &&
                tasks.map((t: any) => (
                  <option key={t._id} value={t._id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}