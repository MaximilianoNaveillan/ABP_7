import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ProductCard from "@/components/products/ProductCard.vue";

const mockProducto = {
  id: 1,
  title: "Laptops Gaming",
  price: 999,
  category: "electronic",
  image: "test.jpg",
};

describe("ProductCard", () => {
  it("renderiza nombre, precio y categoría", async () => {
    const wrapper = mount(ProductCard, {
      props: { producto: mockProducto },
    });
    await wrapper.find("[data-cy=btn-agregar]").trigger("click");
    expect(wrapper.emitted("agregar")).toBeTruthy();
    expect(wrapper.emitted("agregar")[0]).toEqual([mockProducto]);
  });
});