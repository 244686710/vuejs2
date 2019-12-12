import { shallowMount } from "@vue/test-utils";
import BaseButton from "@/components/BaseButton";

describe("BaseButton", () => {
  test("click event", () => {
    // 测试代码
    const wrapper = shallowMount(BaseButton);
    wrapper.trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
