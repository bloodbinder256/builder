const el = (id) => document.getElementById(id);

const itemName = el("itemName");
const type = el("type");
const wood = el("wood");
const shape = el("shape");
const crystal = el("crystal");
const metal = el("metal");
const glow = el("glow");

const weapon = el("weapon");
const tip = el("tip");
const pommel = el("pommel");
const bands = el("bands");
const wrap = el("wrap");
const runes = el("runes");
const vine = el("vine");
const blade = el("blade");

const materialsList = el("materialsList");
const displayName = el("displayName");
const description = el("description");
const glowValue = el("glowValue");

const toggles = {
  bands: el("bandsToggle"),
  wrap: el("wrapToggle"),
  runes: el("runesToggle"),
  vine: el("vineToggle"),
  blade: el("bladeToggle")
};

const materialNames = {
  blackwood: "Blackened wooden dowel",
  birch: "Birch branch",
  redwood: "Redwood staff core",
  bone: "Faux bone finish",
  oak: "Oak branch"
};

function updateMaterials() {
  const list = [
    materialNames[wood.value],
    "Sandpaper",
    "Acrylic paint",
    "Matte sealant",
    "Epoxy or strong glue"
  ];

  if (toggles.bands.checked)
    list.push("Metal band material");

  if (toggles.wrap.checked)
    list.push("Leather wrap");

  if (toggles.runes.checked)
    list.push("Glow paint or carving tools");

  if (toggles.vine.checked)
    list.push("Vine wire or sculpted spiral");

  if (toggles.blade.checked)
    list.push("Foam or plastic decorative blade");

  materialsList.innerHTML =
    list.map(item => `<li>${item}</li>`).join("");
}

function updatePreview() {
  weapon.className = "weapon";

  weapon.classList.add(wood.value);

  if (type.value === "wand")
    weapon.classList.add("wand");

  if (shape.value === "twisted")
    weapon.classList.add("twisted");

  document.documentElement.style
    .setProperty("--crystal", crystal.value);

  document.documentElement.style
    .setProperty("--metal", metal.value);

  document.documentElement.style
    .setProperty("--glow", `rgba(185,140,255,${glow.value / 100})`);

  bands.style.display =
    toggles.bands.checked ? "block" : "none";

  wrap.style.display =
    toggles.wrap.checked ? "block" : "none";

  runes.style.display =
    toggles.runes.checked ? "flex" : "none";

  vine.style.display =
    toggles.vine.checked ? "block" : "none";

  blade.style.display =
    toggles.blade.checked ? "block" : "none";

  glowValue.textContent = glow.value;

  displayName.textContent =
    itemName.value || "Unnamed Staff";

  description.textContent =
    `${wood.options[wood.selectedIndex].text} ${
      type.value
    } with ${
      crystal.options[crystal.selectedIndex].text
    } crystal.`;

  updateMaterials();
}

document.querySelectorAll("input, select")
  .forEach(input => {
    input.addEventListener("input", updatePreview);
    input.addEventListener("change", updatePreview);
  });

el("randomize").addEventListener("click", () => {
  const names = [
    "Moonlit Thorn Staff",
    "Widowroot Wand",
    "Crescent Bone Scepter",
    "Fernfire Focus",
    "Elderwood Relic"
  ];

  itemName.value =
    names[Math.floor(Math.random() * names.length)];

  const selects = [type, wood, shape, crystal, metal];

  selects.forEach(select => {
    select.selectedIndex =
      Math.floor(Math.random() * select.options.length);
  });

  Object.values(toggles).forEach(toggle => {
    toggle.checked = Math.random() > 0.5;
  });

  glow.value = Math.floor(Math.random() * 101);

  updatePreview();
});

updatePreview();
