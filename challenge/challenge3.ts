// Time complexity: O(n)
// Space complexity: O(1)
function sum_to_n_a(n: number): number {
  let total: number = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
}

// Time complexity: O(1)
// Space complexity: O(1)
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

// Time complexity: O(n)
// Space complexity: O(n)
function sum_to_n_c(n: number): number {
  return n == 1 ? 1 : n + sum_to_n_c(n - 1);
}

// console.log("sum_to_n_a(10)", sum_to_n_a(10));
// console.log("sum_to_n_b(10)", sum_to_n_b(10));
// console.log("sum_to_n_b(10)", sum_to_n_c(10));

// console.log("sum_to_n_a(100)", sum_to_n_a(100));
// console.log("sum_to_n_b(100)", sum_to_n_b(100));
// console.log("sum_to_n_b(100)", sum_to_n_c(100));

// console.log("sum_to_n_a(1000)", sum_to_n_a(1000));
// console.log("sum_to_n_b(1000)", sum_to_n_b(1000));
// console.log("sum_to_n_b(1000)", sum_to_n_c(1000));
