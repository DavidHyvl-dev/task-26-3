import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import DomainOverviewCard from "../DomainOverviewCard.vue";

describe("DomainOverviewCard", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  const createWrapper = () => {
    return mount(DomainOverviewCard, {
      props: {
        expiresAt: "2027-01-15T12:00:00Z",
      },
      global: {
        stubs: {
          BaseCard: {
            template: "<div><slot /></div>",
          },
          CopyIcon: true,
        },
      },
    });
  };

  it("shows SHOW button by default", () => {
    const wrapper = createWrapper();

    expect(wrapper.text()).toContain("AuthInfo:");
    expect(wrapper.text()).toContain("SHOW");
    expect(wrapper.text()).not.toContain("Visible for");
  });

  it("reveals secret after click and hides it again after 30 seconds", async () => {
    vi.useFakeTimers();

    const wrapper = createWrapper();

    await wrapper.get(".overview-card__button").trigger("click");

    expect(wrapper.text()).not.toContain("SHOW");
    expect(wrapper.text()).toContain("Visible for 30s");
    expect(wrapper.find(".copy-button").exists()).toBe(true);

    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Visible for 29s");

    vi.advanceTimersByTime(29000);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("SHOW");
    expect(wrapper.text()).not.toContain("Visible for");
    expect(wrapper.find(".copy-button").exists()).toBe(false);
  });
});
