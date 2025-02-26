const PersonStats = ({ items }) => {
  console.log("Přijaté osobní statistiky:", items);

  if (!Array.isArray(items) || items.length === 0) {
      return <p>Žádná data k dispozici</p>;
  }

  return (
      <div>
          <h2>Statistiky společností</h2>
          <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Jméno/Název</th>
                      <th>Výdělek</th>
                  </tr>
              </thead>
              <tbody>
                  {items.map((item, index) => (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.personName || "Neznámé jméno"}</td>
                          <td>{item.revenue ?? 0}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default PersonStats;
