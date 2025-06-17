import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function PlayerForm() {
  const navigate = useNavigate();
  const [playername, setPlayername] = createSignal("");
  const [points, setPoints] = createSignal(0);
  const [avatar, setAvatar] = createSignal("0");

  const avatars = {
    "0": "not set",
    "1": "👨🏻",
    "2": "👨🏼",
    "3": "👨🏽",
    "4": "👨🏾",
    "5": "👨🏿",
    "6": "👩🏻",
    "7": "👩🏼",
    "8": "👩🏽",
    "9": "👩🏾",
    "10": "👩🏿",
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let scoresApiUrl = "/api/scores";

    if (process.env.VERCEL_URL) {
      scoresApiUrl = `http://${process.env.VERCEL_URL}${scoresApiUrl}`;
    }

    await fetch(scoresApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: avatar(), playername: playername(), points: points() }),
    }).then((res) => {
      if (!res.ok) {
        // Handle error
        alert("Failed to add entry: " + res.statusText);
        console.error("Failed to add entry:", res.statusText);
        return;
      }
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit} class="container mt-4">
      <div class="alert alert-success text-center h2">Add New Player</div>
      <div class="row bg-dark text-white py-2">
        <div class="col-3">Avatar</div>
        <div class="col-6">Player Name</div>
        <div class="col-3 text-end">Points</div>
      </div>
      <div class="row py-2">
        <div class="col-3">
          <select class="form-control" value={avatar()} onInput={(e) => setAvatar(e.currentTarget.value)}>
            {Object.entries(avatars).map(([value, label]) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div class="col-6">
          <input class="form-control" type="text" value={playername()} onInput={(e) => setPlayername(e.currentTarget.value)} />
        </div>
        <div class="col-3">
          <input class="form-control" type="number" value={points()} onInput={(e) => setPoints(+e.currentTarget.value)} />
        </div>
      </div>
      <div class="text-end mt-3">
        <button class="btn btn-success me-2" type="submit">✔ Confirm</button>
        <button class="btn btn-secondary" type="button" onClick={() => navigate("/")}>✖ Cancel</button>
      </div>
    </form>
  );
}
