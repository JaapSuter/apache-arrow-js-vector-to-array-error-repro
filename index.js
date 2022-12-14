import { tableFromIPC } from "apache-arrow";

// Hardcoded raw bytes (IPC format) for an Arrow table with two columns and three rows.
const ipcBytes = new Uint8Array([
  255, 255, 255, 255, 192, 0, 0, 0, 16, 0, 0, 0, 0, 0, 10, 0, 16, 0, 14, 0, 7,
  0, 8, 0, 10, 0, 0, 0, 0, 0, 0, 1, 16, 0, 0, 0, 0, 0, 3, 0, 8, 0, 8, 0, 0, 0,
  4, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 88, 0, 0, 0, 20, 0, 0, 0, 16, 0, 24,
  0, 4, 0, 11, 0, 19, 0, 20, 0, 0, 0, 12, 0, 16, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0,
  1, 24, 0, 0, 0, 0, 0, 0, 4, 24, 0, 0, 0, 4, 0, 0, 0, 103, 101, 111, 109, 0, 0,
  0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 16, 0, 20, 0, 4, 0, 0, 0, 15, 0, 16,
  0, 0, 0, 8, 0, 16, 0, 0, 0, 16, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 2, 24, 0, 0, 0,
  3, 0, 0, 0, 105, 100, 120, 0, 0, 0, 0, 0, 8, 0, 12, 0, 8, 0, 7, 0, 8, 0, 0, 0,
  0, 0, 0, 1, 32, 0, 0, 0, 255, 255, 255, 255, 200, 0, 0, 0, 20, 0, 0, 0, 0, 0,
  0, 0, 12, 0, 22, 0, 20, 0, 15, 0, 16, 0, 4, 0, 12, 0, 0, 0, 168, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 3, 16, 0, 0, 0, 3, 0, 10, 0, 24, 0, 12, 0, 8, 0, 4, 0, 10,
  0, 0, 0, 20, 0, 0, 0, 104, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0,
  0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 96, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0,
  119, 190, 159, 26, 47, 181, 94, 192, 80, 141, 151, 110, 18, 147, 72, 64, 180,
  200, 118, 190, 159, 178, 94, 192, 80, 141, 151, 110, 18, 147, 72, 64, 180,
  200, 118, 190, 159, 178, 94, 192, 47, 221, 36, 6, 129, 149, 72, 64, 119, 190,
  159, 26, 47, 181, 94, 192, 47, 221, 36, 6, 129, 149, 72, 64, 119, 190, 159,
  26, 47, 181, 94, 192, 80, 141, 151, 110, 18, 147, 72, 64, 0, 0, 0, 255, 255,
  255, 255, 200, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 12, 0, 22, 0, 20, 0, 15, 0,
  16, 0, 4, 0, 12, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 16, 0, 0, 0, 3,
  0, 10, 0, 24, 0, 12, 0, 8, 0, 4, 0, 10, 0, 0, 0, 20, 0, 0, 0, 104, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0,
  0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255,
  255, 0, 0, 0, 0,
]);

// Load the table.
const table = tableFromIPC(ipcBytes);

// Iterate over each column...
for (let i = 0; i < table.numCols; ++i) {
  // Get the underlying vector.
  const vector = table.getChildAt(i);

  try {
    // Try to convert the vector it to a plain-or-typed array.
    vector.toArray();

    // Which should work fine (it does in the Python equivalent, see `repro.py` using `toPyList` on the same data).
    console.log(`Vector '${table.schema.fields[i].name}' toArray worked fine.`);
  } catch (error) {
    // But for some reason throws an error on the first column, because `memo.array.set(values, memo.offset);`
    // goes out of bounds in `toArray` inside of Apache Arrow's `vector.mjs`/`vector.ts` implementation.
    console.log(
      `Vector '${table.schema.fields[i].name}' toArray threw error: '${error}'.`
    );
  }
}
