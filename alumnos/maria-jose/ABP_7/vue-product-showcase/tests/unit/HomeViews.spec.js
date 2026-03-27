import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import HomeViews from "@/views/HomeViews.vue";

describe("HomeView", () => {
  it("muestra mensaje de error cuando el store tiene error", () => {
    const wrapper = mount(HomeViews, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              productos: {
                lista: [],
                cargando: false,
                error: "Error de red",
                categorias: [],
              },
              filtros: { categoriaActual: "todas" },
            },
          }),
        ],
      },
    });
    expect(wrapper.text()).toContain("error");
    // o si tienen clase en el template:
    // expect(wrapper.find('.estado-error').exists()).toBe(true)
  });

  it("muestra spinner cuando cargando es true", () => {
    const wrapper = mount(HomeViews, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              productos: {
                lista: [],
                cargando: true,
                error: null,
                categorias: [],
              },
              filtros: { categoriaActual: "todas" },
            },
          }),
        ],
      },
    });
    expect(wrapper.find(".spinner").exists()).toBe(true);
  });
});