import { CaretDownFilled } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Divider, Dropdown, List } from 'antd';

const HeaderContent = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: 52,
      }}
    >
      <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
      <Dropdown
        placement="bottomCenter"
        overlay={
          <div
            style={{
              padding: '32px 40px',
              backgroundColor: '#fff',
              width: '100vw',
              height: '307px',
              boxShadow:
                '0 8px 16px 0 rgba(0,0,0,0.03), 0 4px 8px 0 rgba(25,15,15,0.07), 0 2px 4px 0 rgba(0,0,0,0.08)',
              borderRadius: '0 0 6px 6px',
            }}
          >
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <List />
              </div>

              <div
                style={{
                  width: '308px',
                  borderLeft: '1px solid rgba(0,0,0,0.06)',
                  paddingLeft: 16,
                }}
              >
                <div
                  className={css`
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.45);
                    line-height: 22px;
                  `}
                >
                  热门工具
                </div>
                <div
                  className={css`
                    border-radius: 4px;
                    padding: 16px;
                    margin-top: 4px;
                    display: flex;
                    cursor: pointer;
                    &:hover {
                      background-color: rgba(0, 0, 0, 0.03);
                    }
                  `}
                >
                  <img
                    style={{ width: 32 }}
                    src="https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg"
                  />
                  <div
                    style={{
                      marginLeft: 14,
                    }}
                  >
                    <div
                      className={css`
                        font-size: 14px;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 22px;
                      `}
                    >
                      格式JSON
                    </div>
                    <div
                      className={css`
                        font-size: 12px;
                        color: rgba(0, 0, 0, 0.45);
                        line-height: 20px;
                      `}
                    >
                      快速将JSON格式化
                    </div>
                  </div>
                </div>

                <div
                  className={css`
                    border-radius: 4px;
                    padding: 16px;
                    margin-top: 4px;
                    display: flex;
                    cursor: pointer;
                    &:hover {
                      background-color: rgba(0, 0, 0, 0.03);
                    }
                  `}
                >
                  <img
                    style={{ width: 32 }}
                    src="https://gw.alipayobjects.com/zos/antfincdn/6FTGmLLmN/bianzu%25252013.svg"
                  />
                  <div
                    style={{
                      marginLeft: 14,
                    }}
                  >
                    <div
                      className={css`
                        font-size: 14px;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 22px;
                      `}
                    >
                      压缩图片
                    </div>
                    <div
                      className={css`
                        font-size: 12px;
                        color: rgba(0, 0, 0, 0.45);
                        line-height: 20px;
                      `}
                    >
                      按照输入的规格压缩图片
                    </div>
                  </div>
                </div>

                <div
                  className={css`
                    border-radius: 4px;
                    padding: 16px;
                    margin-top: 4px;
                    display: flex;
                    cursor: pointer;
                    &:hover {
                      background-color: rgba(0, 0, 0, 0.03);
                    }
                  `}
                >
                  <img
                    style={{ width: 32 }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  />
                  <div
                    style={{
                      marginLeft: 14,
                    }}
                  >
                    <div
                      className={css`
                        font-size: 14px;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 22px;
                      `}
                    >
                      值班
                    </div>
                    <div
                      className={css`
                        font-size: 12px;
                        color: rgba(0, 0, 0, 0.45);
                        line-height: 20px;
                      `}
                    >
                      公司轮流值班情况
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            minWidth: '180px',
          }}
          className={css`
            padding: 0 16px;
            &:hover {
              background-color: rgba(0, 0, 0, 0.03);
            }
          `}
        >
          <span> 软件导航</span>
          <CaretDownFilled />
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderContent;
