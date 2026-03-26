import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import AppTopbar from "../AppTopbar.vue";

describe("AppTopbar", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  const createWrapper = () => {
    return mount(AppTopbar, {
      attachTo: document.body,
      global: {
        stubs: {
          Menu: true,
          UserCircle2Icon: true,
          UserMenu: {
            template: '<div data-test="user-menu">User menu</div>',
          },
        },
      },
    });
  };

  it("renders app title and user name", () => {
    const wrapper = createWrapper();

    expect(wrapper.text()).toContain("Ferda");
    expect(wrapper.text()).toContain("Jan Musílek");
  });

  it("emits toggle-sidebar when sidebar button is clicked", async () => {
    const wrapper = createWrapper();

    await wrapper.get('button[aria-label="Toggle sidebar"]').trigger("click");

    expect(wrapper.emitted("toggle-sidebar")).toHaveLength(1);
  });

  it("keeps user menu closed by default", () => {
    const wrapper = createWrapper();

    expect(wrapper.find('[data-test="user-menu"]').exists()).toBe(false);
    expect(wrapper.get(".user-button").attributes("aria-expanded")).toBe(
      "false",
    );
  });

  it("opens user menu when user button is clicked", async () => {
    const wrapper = createWrapper();

    await wrapper.get(".user-button").trigger("click");

    expect(wrapper.find('[data-test="user-menu"]').exists()).toBe(true);
    expect(wrapper.get(".user-button").attributes("aria-expanded")).toBe(
      "true",
    );
  });

  it("closes user menu when user button is clicked again", async () => {
    const wrapper = createWrapper();
    const userButton = wrapper.get(".user-button");

    await userButton.trigger("click");
    expect(wrapper.find('[data-test="user-menu"]').exists()).toBe(true);

    await userButton.trigger("click");
    expect(wrapper.find('[data-test="user-menu"]').exists()).toBe(false);
    expect(userButton.attributes("aria-expanded")).toBe("false");
  });

  it("closes user menu when clicking outside", async () => {
    const wrapper = createWrapper();

    await wrapper.get(".user-button").trigger("click");
    expect(wrapper.find('[data-test="user-menu"]').exists()).toBe(true);

    document.body.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test="user-menu"]').exists()).toBe(false);
    expect(wrapper.get(".user-button").attributes("aria-expanded")).toBe(
      "false",
    );
  });

  it("closes user menu when Escape is pressed", async () => {
    const wrapper = createWrapper();

    await wrapper.get(".user-button").trigger("click");
    expect(wrapper.find('[data-test="user-menu"]').exists()).toBe(true);

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test="user-menu"]').exists()).toBe(false);
    expect(wrapper.get(".user-button").attributes("aria-expanded")).toBe(
      "false",
    );
  });

  it("registers and removes document event listeners", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const wrapper = createWrapper();

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );
  });
});
