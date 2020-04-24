window.onload = function () {
  const crf = 200000;
  let msg = this.document.getElementById("msg");
  let form = this.document.getElementById("paye");
  let salary = this.document.getElementById("salary");
  let occurrence = this.document.getElementById("occurrence");
  let showMsg = function (type, text) {
    if (msg.firstChild != null) msg.removeChild(msg.firstChild);
    let html = document.createElement("div");
    html.className = "alert alert-" + type;
    html.insertAdjacentHTML("beforeend", text);
    msg.append(html);
  };
  let num = function (n) {
    let p = n.toString().split(".");
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p.join(".");
  };
  salary.addEventListener("keyup", function () {
    let a = salary.value.split("");
    let l = a[a.length - 1];
    if (!l.match("[0-9]")) {
      a.pop();
      salary.value = a.join("");
    }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let sv = parseFloat(salary.value);
    let oc = occurrence.value;
    let annual = oc == "annually" ? sv : sv * 12;
    if (annual < 300000) {
      showMsg(
        "danger",
        "Amount must be an annual sum of at least 300,000, your annual value is " +
          num(annual)
      );
      return false;
    }
    let a20 = (Math.round((20 * 100.0) / 100.0) / 100) * annual;
    let a20crf = a20 + crf;
    let txb = annual - a20crf;
    let totalPAYE = 0;
    let taxes = [
      { price: 300000, rate: "0.07" },
      { price: 300000, rate: "0.11" },
      { price: 500000, rate: "0.15" },
      { price: 500000, rate: "0.19" },
      { price: 1600000, rate: "0.21" },
      { price: 3200000, rate: "0.24" },
    ];
    for (let i = 0; i < taxes.length; i++) {
      let { price, rate } = taxes[i];
      let p = parseFloat(price);
      let r = parseFloat(rate);
      let c = txb - p;
      if (c > 0) {
        totalPAYE += parseFloat(p * r);
        txb -= p;
      } else {
        totalPAYE += parseFloat(txb * r);
        break;
      }
    }
    let txt = `Annual Before P.A.Y.E.: ${num(annual.toFixed(2))} <br/>`;
    txt += `Monthly Before P.A.Y.E.: ${num((annual / 12).toFixed(2))} <br/>`;
    txt += `Annual P.A.Y.E.: ${num(totalPAYE.toFixed(2))} <br/>`;
    txt += `Monthly P.A.Y.E.: ${num((totalPAYE / 12).toFixed(2))} <br/>`;
    txt += `Annual Salary: ${num((annual - totalPAYE).toFixed(2))} <br/>`;
    txt += `Monthly Salary: ${num(
      (annual / 12 - totalPAYE / 12).toFixed(2)
    )} <br/>`;
    showMsg("success", txt);
  });
};
