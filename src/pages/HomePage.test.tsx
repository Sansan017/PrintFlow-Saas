import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("menampilkan judul PrintFlow", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("PrintFlow")).toBeInTheDocument();
  });

  it("menampilkan status Supabase belum dikonfigurasi ketika env kosong", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Supabase belum dikonfigurasi"),
    ).toBeInTheDocument();
  });
});
