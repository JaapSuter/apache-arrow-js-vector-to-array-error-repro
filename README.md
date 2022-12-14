# apache-arrow-js-vector-to-array-error-

Minimal reproduction of some Apache Arrow code in Javascript that throws an unexpected error (vector.toArray).

To reproduce the problem:

1.  Clone the repo
2.  Run `npm install` to install the `apache-arrow` dependency.
3.  Run `npm run repro` to reproduce the problem.

For some reason, the `data.reduce` operation inside of Apache Arrow's `vector.ts` is going out of bounds, because the vector's length is 3, but the `reduce` operation is trying to 2 times 2 things together.

![image](https://user-images.githubusercontent.com/44677/207690807-b50b9ead-f2d5-4a7d-9c0f-3b596aa6923d.png)

I suppose it could be that the raw IPC bytes might contain a malformed table -- though we've been using this table for a long time, we just never called `toArray` on it before until now.

Ideally, if `for (let i = 0; i < vector.length; ++i) vector.get(i);` works successfully on a vector, I'd consider the data therein valid, and I'd assume that `vector.toArray` works as well.

Additionally, the repo contains a Python version of the same code (convert each column in a table into a list, the python equivalent of the Javascript array) which works as expected on the exact same IPC data.

The plot thickens -- I'm gonna dive into the Arrow JS internals next.
