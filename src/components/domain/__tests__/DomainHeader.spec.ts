import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DomainHeader from "../DomainHeader.vue";

describe("DomainHeader", () => {
  it("renders fqdn", () => {
    const wrapper = mount(DomainHeader, {
      props: {
        fqdn: "example.cz",
        verbose: false,
      },
    });

    expect(wrapper.text()).toContain("example.cz");
  });

  it("renders checkbox based on verbose prop", () => {
    const wrapper = mount(DomainHeader, {
      props: {
        fqdn: "example.cz",
        verbose: true,
      },
    });

    const checkbox = wrapper.get('input[type="checkbox"]');

    expect((checkbox.element as HTMLInputElement).checked).toBe(true);
  });

  it("emits update:verbose with true when checkbox is checked", async () => {
    const wrapper = mount(DomainHeader, {
      props: {
        fqdn: "example.cz",
        verbose: false,
      },
    });

    await wrapper.get('input[type="checkbox"]').setValue(true);

    expect(wrapper.emitted("update:verbose")).toEqual([[true]]);
  });

  it("emits update:verbose with false when checkbox is unchecked", async () => {
    const wrapper = mount(DomainHeader, {
      props: {
        fqdn: "example.cz",
        verbose: true,
      },
    });

    await wrapper.get('input[type="checkbox"]').setValue(false);

    expect(wrapper.emitted("update:verbose")).toEqual([[false]]);
  });
});
